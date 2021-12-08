import React, { Component } from 'react';
import './SearchBar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import CustomFoodModal from '../Modal/CustomFoodModal';
import Combobox from "react-widgets/Combobox";
import "react-widgets/styles.css";
import AddCategoryModal from '../Modal/AddCategoryModal';
import DeleteCategoryModal from '../Modal/DeleteCategoryModal';
import EditCategoryModal from '../Modal/EditCategoryModal';
import Add from '../../images/add.png';
import Delete from '../../images/delete.png';

const paginacionOpciones={
  rowsPerPageText: 'Filas por Página',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
  
}
const customStyles = {
	header: {
		style: {
			minHeight: '56px',
      background:'#CCDDE2',
      borderRadius:'17px',
      textShadow: '1px 1px black',
		},
	},
	headRow: {
		style: {
      backgroundColor: '#B6E052'
		},
	},
	headCells: {
		style: {
			'&:not(:last-of-type)': {},
		},
	},
  pagination: {
		style: {
			backgroundColor:'#B6E052'
		},
	},
  row:{
    pointer:{
      backgroundColor:'blue'
    }
  },
};
const conditionalRowStyles = [
    {
      when: row => row.caloriesPerServing > 0,
      style: {
        backgroundColor: '#B6E052',
        color: 'black',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
  ];


class FoodsSearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      busquedaNombre: '',
      busquedaCategoria: '',
      alimentos: [],
      categorias: [],
      columnas:[],
      cantidadAlimentos: 0,
      cantidadCategorias: 0
    };
  }

  onChange = async event => {
    event.persist();
    await this.setState({busquedaNombre: event.target.value});
    this.filtrarElementos();
  }

  asignarColumnas=()=>{
    const columnas = [
      {
        cell:(row) => {
          if(row.userId){
            return(
              <div>
                <img src={Delete} alt='eliminar' onClick={() => {
                  const answer = window.confirm('Eliminar comida custom?');
                  if(answer){
                    this.props.onDeleteCustomFood(row.foodId)
                  }
                  }} id={row.foodId} style={{width: '20px', height: '20px', cursor: 'pointer'}}/>
                <CustomFoodModal edit={true} row={row} foodId={row.foodId} onEditCustomFood={this.props.onEditCustomFood} foodCategories={this.props.foodCategories}/>
                <img src={Add} alt='agregar' onClick={() => this.props.onAddFoodToCurrentMeal(row)} id={row.foodId} style={{width: '20px', height: '20px', cursor: 'pointer'}}/>
              </div>
            )
          } else {
            return(
            <img src={Add} alt='agregar' onClick={() => this.props.onAddFoodToCurrentMeal(row)} id={row.foodId} style={{width: '20px', height: '20px', cursor: 'pointer', marginLeft: 40}}/>
            )
          }
        }
        ,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true
      },
      {
        name: 'Nombre',
        selector: row => row.name,
        sortable: true
      },
      {
        name: 'Categoría',
        selector: row => (
          <div>
            {
              this.props.foodCategories.map((foodCategory) => {
                if(row.foodCategoryId === foodCategory.foodCategoryId){
                  return(
                    <div key={foodCategory.foodCategoryId}>{foodCategory.name}</div>
                  )
                } else {
                  return(
                    <div key={foodCategory.foodCategoryId}></div>
                  )
                }
              })
            }
          </div>
        ),
        sortable: true
      },
      {
        name: 'Porción Recomendada',
        selector: row => row.recommendedServing,
        sortable: true
      },
      {
        name: 'Calorías Por Porción Recomendada',
        selector: row => row.caloriesPerServing,
        sortable: true
      }
    ];

    this.setState({columnas: columnas});
  }

  filtrarElementos=()=>{
    let search = this.props.foods.filter(food => {
      if(this.state.busquedaNombre === '' && this.state.busquedaCategoria === ''){
        return food;
      } else if(food.name.toLowerCase().includes(this.state.busquedaNombre)  && this.state.busquedaCategoria === ''){
        return food;
      } else if (this.state.busquedaNombre === '' && food.foodCategoryId.toString() === this.state.busquedaCategoria.toString()){
        return food;
      } else if(food.name.toLowerCase() === this.state.busquedaNombre && food.foodCategoryId.toString() === this.state.busquedaCategoria.toString()){
        return food;
      } else {
        return '';
      }
    });
    this.setState({alimentos: search});
  }

  async componentDidMount(){
    await this.props.onGetAllFoods(this.props.userId);
    await this.props.onGetFoodCategories(this.props.userId);
    let foodCategoriesCopy = [...this.props.foodCategories];
    foodCategoriesCopy.unshift({foodCategoryId: 0, name: 'Ver todos los alimentos', userId: null});
    this.setState({
      alimentos: this.props.foods,
      cantidadAlimentos: this.props.foods.length,
      categorias: foodCategoriesCopy,
      cantidadCategorias: this.props.foodCategories.length
    });
    this.asignarColumnas();
  }

  async componentDidUpdate(){
    if(this.props.foods.length !== this.state.cantidadAlimentos || this.props.foodCategories.length !== this.state.cantidadCategorias){
      await this.props.onGetAllFoods(this.props.userId);
      await this.props.onGetFoodCategories(this.props.userId);
      let foodCategoriesCopy = [...this.props.foodCategories];
      foodCategoriesCopy.unshift({foodCategoryId: 0, name: 'Ver todos los alimentos', userId: null});
      this.setState({
        alimentos: this.props.foods,
        cantidadAlimentos: this.props.foods.length,
        categorias: foodCategoriesCopy,
        cantidadCategorias: this.props.foodCategories.length
      });
      this.asignarColumnas();
    }
  }
  
  onChangeComboBox = async event => {
    if(event.foodCategoryId === 0){ //Ver todos los alimentos
      await this.setState({...this.state, busquedaCategoria: ''});
    } else if(event.foodCategoryId === -1){ //Crear un nuevo alimento
      await this.setState({...this.state, busquedaCategoria: ''});
      console.log('ABRIR MODAL');
    } else {
      await this.setState({...this.state, busquedaCategoria: event.foodCategoryId});
    }
    this.filtrarElementos();
  }

  render(){
    return (
      <div className="table-responsive" style={{backgroundColor:'#B6E052'}}>
        <div className="barraBusquedaNombre" style={{backgroundColor:'#B6E052'}}>
          <div style={{backgroundColor: 'lightblue', borderRadius: 10, display: 'flex',justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', marginBottom: 20}}>
            <h1 style={{color: 'rgb(0, 38, 38)', fontFamily: 'Arial', fontSize: 30, alignSelf: 'center', textAlign: 'center', marginTop: 8, marginLeft: 5}}>Alimentos</h1>
            <div>
              <input
              type="text"
              placeholder="Buscar por nombre"
              className="textField"
              name="busquedaNombre"
              value={this.state.busquedaNombre}
              onChange={this.onChange}
              style={{borderRadius:'13px'}}
              />
              <button type="button" className="btnBuscar" style={{borderRadius:'19px'}}>
              {" "}
              <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Combobox
              data={this.state.categorias}
              defaultValue={this.state.categorias[0]}
              textField='name'
              onSelect={this.onChangeComboBox}
              groupBy={category => category.userId}
              placeholder= "Buscar por categoría"
              renderListGroup={ ({group}) => ( //group es el userId
                <span>
                  {group === null ? 'Default' : 'Custom'}
                </span>
              )}
              style={{width: "80%"}}
              />
            <div style={{paddingLeft: 10, width: "20%", justifyContent: 'space-between'}}>
              <AddCategoryModal userId={this.props.userId} onCreateCategory={this.props.onCreateCategory} isPending={this.props.foodCategoryIsPending}/>
              <DeleteCategoryModal userId={this.props.userId} onDeleteCategory={this.props.onDeleteCategory} foodCategories={this.props.foodCategories} isPending={this.props.foodCategoryIsPending}/>
              <EditCategoryModal userId={this.props.userId} onEditCategory={this.props.onEditCategory} foodCategories={this.props.foodCategories} isPending={this.props.foodCategoryIsPending}/>
            </div>
          </div>
          
        </div>
        <DataTable 
          columns={this.state.columnas}
          data={this.state.alimentos}
          pagination
          paginationComponentOptions={paginacionOpciones}
          fixedHeader
          fixedHeaderScrollHeight="600px"
          noDataComponent={
            <span style={{marginTop: 150, marginBottom: 150}}>No se encontró ningún alimento</span>
          }
          conditionalRowStyles={conditionalRowStyles}
          customStyles={customStyles}
          pointer
        />
      </div>
    );
  }
}
export default FoodsSearchBar;
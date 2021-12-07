import React, { Component } from 'react';
import './SearchBar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import Combobox from "react-widgets/Combobox";
import "react-widgets/styles.css";
import Add from '../../images/add.png';
import TextField from '@material-ui/core/TextField';

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


class FoodCategoriesSearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      busquedaCategoria: '',
      alimentos: [],
      categorias: [],
      categoriasFiltradas: '',
      columnas:[],
      quantity: ''
    };
  }

  onChange = async event => {
    event.persist();
    await this.setState({busquedaNombre: event.target.value});
    this.filtrarElementos();
  }

  validateQuantity = (quantity) => { //cannot be empty and only numbers
    const expression = /^\d+$/
    return expression.test(String(quantity).toLowerCase())
  }

  handleChangeInput = async event => {
    event.persist();
    if(this.validateQuantity(event.target.value)){
      await this.setState({quantity: event.target.value})
    } else {
      await this.setState({quantity: ''})
    }
    this.asignarColumnas();
  }

  asignarColumnas=()=>{
    const columnas = [
      {
        cell:(row) => {
          return(
            <div>
              <img src={Add} alt='agregar' onClick={async () => {
                if(this.state.quantity !== '' && this.state.quantity > 0){
                  let objective = {
                    foodCategoryId: row.foodCategoryId,
                    objectiveCalories: parseInt(this.state.quantity, 10),
                  };
                  this.props.onAddObjectiveToCurrentGoal(objective)
                }
                }} id={row.foodId} style={{width: '20px', height: '20px', cursor: 'pointer', marginLeft: 40}}/>
            </div>
          )
        },
        ignoreRowClick: true,
        allowOverflow: true,
        button: true
      },
      {
        name: 'Categoría',
        selector: row => row.name,
        sortable: true
      }
    ];

    this.setState({columnas: columnas});
  }

  filtrarElementos=()=>{
    let search = this.props.foodCategories.filter(foodCategory => {
      if(foodCategory.foodCategoryId.toString() === this.state.busquedaCategoria.toString()){
        return foodCategory;
      } else {
        return '';
      }
    });
    this.setState({categoriasFiltradas: search});
    if(this.state.categoriasFiltradas.length === 0){
      this.setState({categoriasFiltradas: this.props.foodCategories});
    }
  }

  async componentDidMount(){
    await this.props.onGetAllFoods(this.props.userId);
    await this.props.onGetFoodCategories(this.props.userId);
    let foodCategoriesCopy = [...this.props.foodCategories];
    foodCategoriesCopy.unshift({foodCategoryId: 0, name: 'Ver todas las categorías', userId: null});
    this.setState({
      alimentos: this.props.foods,
      categorias: foodCategoriesCopy,
      categoriasFiltradas: this.props.foodCategories
    });
    this.asignarColumnas();
  }
  
  onChangeComboBox = async event => {
    if(event.foodCategoryId === 0){ //Ver todos los alimentos
      await this.setState({...this.state, busquedaCategoria: ''});
    } else if(event.foodCategoryId === -1){ //Crear un nuevo alimento
      await this.setState({...this.state, busquedaCategoria: ''});
    } else {
      await this.setState({...this.state, busquedaCategoria: event.foodCategoryId});
    }
    this.filtrarElementos();
  }

render(){
  return (
    <div className="table-responsive" style={{backgroundColor:'#B6E052'}}>
      <div className="barraBusquedaNombre" style={{backgroundColor:'#B6E052'}}>

        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Combobox
            data={this.state.categorias}
            textField='name'
            onSelect={this.onChangeComboBox}
            groupBy={category => category.userId}
            placeholder= "Categoría"
            renderListGroup={ ({group}) => ( //group es el userId
              <span>
                {group === null ? 'Default' : 'Custom'}
              </span>
            )}
            style={{width: "80%"}}
            />
        </div>
        <div style={{width: '80%', backgroundColor: 'white', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
          <p>Ingrese la cantidad de calorías que desea agregar: </p>
          <TextField label="Calorias" name='quantity' type='quantity' style={{width: '100px'}} value={this.state.quantity} onChange={this.handleChangeInput} required/>
        </div>
      </div>
      <DataTable 
        columns={this.state.columnas}
        data={this.state.categoriasFiltradas}
        pagination
        paginationComponentOptions={paginacionOpciones}
        fixedHeader
        fixedHeaderScrollHeight="600px"
        noDataComponent={
          <span>No se encontró ninguna categoría</span>
        }
        conditionalRowStyles={conditionalRowStyles}
        customStyles={customStyles}
        pointer
      />
    </div>
  );
}
}
export default FoodCategoriesSearchBar;
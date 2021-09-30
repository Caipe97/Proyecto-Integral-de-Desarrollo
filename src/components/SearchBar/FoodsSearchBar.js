import React, { Component } from 'react';
import './SearchBar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import CustomFoodModal from '../Modal/CustomFoodModal';
import Combobox from "react-widgets/Combobox";
import "react-widgets/styles.css";

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
      backgroundColor: '#B6E052',
			// borderTopStyle: 'solid',
			// borderTopWidth: '1px',
			// borderTopColor: 'black',
		},
	},
	headCells: {
		style: {
			'&:not(:last-of-type)': {
				// borderRightStyle: 'solid',
				// borderRightWidth: '1px',
				// borderRightColor: 'black',
			},
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
      columnas:[],
      cantidadAlimentos: 0
    };
  }

  onChange = async event => {
    event.persist();
    await this.setState({busquedaNombre: event.target.value});
    // this.handleChangeComboBox();
    this.filtrarElementos();
  }

  asignarColumnas=()=>{
    const columnas = [
      {
        cell:(row) => {
          if(row.userId){
            return(
              <div>
                <button onClick={() => this.props.onAddFoodToCurrentMeal(row)} id={row.foodId} style={{backgroundColor:'#f5f6f7'}} className='btn btn--primary btn--s'>Agregar</button>
                <CustomFoodModal edit={true} foodId={row.foodId} onEditCustomFood={this.props.onEditCustomFood}/>
                <button onClick={() => this.props.onDeleteCustomFood(row.foodId)} id={row.foodId} style={{backgroundColor:'#f5f6f7'}} className='btn btn--primary btn--s'>Eliminar</button>
              </div>
            )
          } else {
            return(
            <button onClick={() => this.props.onAddFoodToCurrentMeal(row)} id={row.foodId} style={{backgroundColor:'#f5f6f7'}} className='btn btn--primary btn--s'>Agregar</button>
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
        name: 'Porción Recomendada',
        selector: row => row.recommendedServing,
        sortable: true,
        // grow: 3
      },
      {
        name: 'Calorías Por Porción Recomendada',
        selector: row => row.caloriesPerServing,
        sortable: true,
        // grow: 4
      }
    ];

    this.setState({columnas: columnas});
  }

  filtrarElementos=()=>{
    let search = this.props.foods.filter(item => {
      if(this.state.busquedaNombre === '' && this.state.busquedaCategoria === ''){
        return item;
      } else if(item.name.toLowerCase().includes(this.state.busquedaNombre) && this.state.busquedaCategoria === ''){
        return item;
      } else if (this.state.busquedaNombre === '' && item.recommendedServing.toString().includes(this.state.busquedaCategoria)){
        return item;
      } else if(item.name.toLowerCase().includes(this.state.busquedaNombre) && item.recommendedServing.toString().includes(this.state.busquedaCategoria)){
        return item;
      } else {
        return '';
      }
    });
    this.setState({alimentos: search});
  }

  async componentDidMount(){
    await this.props.onGetAllFoods(this.props.userId);
    this.setState({alimentos: this.props.foods, cantidadAlimentos: this.props.foods.length});
    this.asignarColumnas();
  }

  async componentDidUpdate(){
    if(this.props.foods.length !== this.state.cantidadAlimentos){
      await this.props.onGetAllFoods(this.props.userId);
      this.setState({alimentos: this.props.foods, cantidadAlimentos: this.props.foods.length});
      this.asignarColumnas();
    }
  }
  
  onChangeComboBox = async event => {
    await this.setState({...this.state, busquedaCategoria: event.recommendedServing})
    this.filtrarElementos();
  }

render(){
  return (
    <div className="table-responsive" style={{backgroundColor:'#B6E052'}}>
      <div className="barraBusquedaNombre" style={{backgroundColor:'#B6E052'}}>
        <Combobox
          data={[
            {name: "Ver todos los alimentos", foodId: 0 ,userId: 0, recommendedServing: ''},
            {name: "Frutas verdes", foodId: 2 ,userId: 4, recommendedServing: '50'},
            {name: "Carnes", foodId: 3 ,userId: 0, recommendedServing: '123'},
            {name: "Carnes de animal terrestre", foodId: 4 ,userId: 4, recommendedServing: '10'},
            {name: "Carbohidratos", foodId: 3 ,userId: 0, recommendedServing: '113'},
            {name: "Crear nueva categoría", foodId: -1 ,userId: -1, recommendedServing: '2'}
          ]}
          textField='recommendedServing'
          onSelect={this.onChangeComboBox}
          groupBy={person => person.userId}
          renderListGroup={ ({group}) => ( //group es el userId
            <span>{group === 0 ? 'Default' : 'Custom'}</span>
          )}
        />
        <input
          type="text"
          placeholder="Buscar por nombre"
          className="textField"
          name="busquedaNombre"
          value={this.state.busquedaNombre}
          onChange={this.onChange}
          style={{borderRadius:'13px'}}
        />
        <button type="button" className="btnBuscar" style={{borderRadius:'19px'}}/*onClick={onClear}*/>
          {" "}
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      <DataTable 
        columns={this.state.columnas}
        data={this.state.alimentos}
        title="Alimentos"
        pagination
        paginationComponentOptions={paginacionOpciones}
        fixedHeader
        fixedHeaderScrollHeight="600px"
        noDataComponent={
          <span>No se encontró ningún alimento</span>
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
import React, { Component } from 'react';
import './SearchBar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import MealModal from '../Modal/MealModal';

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


class MealsSearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      busqueda: '',
      meals: [],
      columnas:[],
      cantidadMeals: 0
    };
  }

  onChange = async event => {
    event.persist();
    await this.setState({busqueda: event.target.value});
    this.filtrarElementos();
  }

  asignarColumnas=()=>{
    const columnas = [
      {
        cell:(row) => {
          return(
            <MealModal meal={row} history={this.props.history} onDeleteMeal={this.props.onDeleteMeal} onUpdateCurrentMealInState={this.props.onUpdateCurrentMealInState}/>
          )
        },
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
        name: 'Fecha de consumo',
        selector: row => row.dateEaten.toString().replace('T',' ').substring(0,16),
        sortable: true
      }
    ];

    this.setState({columnas: columnas});
  }

  filtrarElementos=()=>{
    let search = this.props.meals.filter(meal => {
      if(meal.name.toLowerCase().includes(this.state.busqueda) || meal.dateEaten.includes(this.state.busqueda)){
        return meal;
      } else {
        return '';
      }
    });
    this.setState({meals: search});
  }

  async componentDidMount(){
    this.setState({meals: this.props.meals});
    this.asignarColumnas();
  }

  async componentDidUpdate(){
    if(this.props.meals.length !== this.state.cantidadMeals){
      await this.props.onGetMealsFromUser(this.props.userId)
      this.setState({meals: this.props.meals, cantidadMeals: this.props.meals.length});
      this.asignarColumnas();
    }
  }
  
render(){
  return (
    <div className="table-responsive" style={{backgroundColor:'#B6E052'}}>
      <div className="barraBusqueda" style={{ display:'flex', width: "100%",  justifyContent: 'space-between'}}>
        <h1 style={{color: 'rgb(0, 38, 38)', fontFamily: 'Arial', fontSize: 30}}>Comidas</h1>
        <div style={{display: 'flex', alignSelf: 'center'}}>
          <input
            type="text"
            placeholder="Buscar por nombre o fecha"
            className="textField"
            name="busqueda"
            value={this.state.busqueda}
            onChange={this.onChange}
            style={{borderRadius:'13px', width: '88%'}}
            />
          <button type="button" className="btnBuscar" style={{borderRadius:'19px', marginLeft: 5}}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
          <button  type="button" className='btn btn--primary btn--s' style={{ boxShadow: '0px 4px 4px grey', backgroundColor:'#f5f6f7', color: 'black', fontSize: '11px', height: 30, marginLeft: 10}}  onClick={async () => {  this.props.history.push("/meals"); }}>Agregar</button>
        </div>
      </div>
      <DataTable
        columns={this.state.columnas}
        data={this.state.meals}
        pagination
        paginationComponentOptions={paginacionOpciones}
        fixedHeader
        fixedHeaderScrollHeight="600px"
        noDataComponent={
          <span>No se encontró ninguna comida</span>
        }
        conditionalRowStyles={conditionalRowStyles}
        customStyles={customStyles}
        pointer
      />
    </div>
  );
}
}
export default MealsSearchBar;
import React, { Component } from 'react';
import './SearchBar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const paginacionOpciones={
  rowsPerPageText: 'Filas por Página',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
}

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      busqueda: '',
      alimentos: [],
      columnas:[]
    };
  }

  onChange = async event=>{
    event.persist();
    await this.setState({busqueda: event.target.value});
    this.filtrarElementos();
  }

  asignarColumnas=()=>{
    const columnas = [
      {
        cell:(row) => <button onClick={() => this.props.onAddFoodToCurrentMeal(row)} id={row.foodId} style={{backgroundColor:'#EFE7DA'}} className='btn btn--primary btn--s'>Agregar</button>,
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
        name: 'Porcion Recomendada',
        selector: row => row.recommendedServing,
        sortable: true,
        // grow: 3
      },
      {
        name: 'Gramos Por Porcion Recomendada',
        selector: row => row.caloriesPerServing,
        sortable: true,
        // grow: 4
      }
    ];

    this.setState({columnas: columnas});
  }

  filtrarElementos=()=>{
    let search=this.props.foods.filter(item => {
      if(item.name.toLowerCase().includes(this.state.busqueda)
        // item.name.includes(this.state.busqueda) ||
        // item.recommendedServing.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"").includes(this.state.busqueda) ||
        // item.caloriesPerServing.toString().toLowerCase().includes(this.state.busqueda)
      ){
        return item;
      } else {
        return '';
      }
    });
    this.setState({alimentos: search});
  }

  componentDidMount(){
    this.setState({alimentos: this.props.foods});
    this.asignarColumnas();
  }
  
render(){
  return (
    <div className="table-responsive" >
      <div className="barraBusqueda">
        <input
          type="text"
          placeholder="Buscar por name"
          className="textField"
          name="busqueda"
          value={this.state.busqueda}
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
          <span>No se encontró ningún elemento</span>
        }
      />
    </div>
  );
}
}
export default SearchBar;
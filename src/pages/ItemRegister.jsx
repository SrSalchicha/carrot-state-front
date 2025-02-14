import "../styles/stylespage/Login.css";
import "../styles/style.css";
import Inputs from "../continuous/Inputs";
import Select from "../continuous/Select";
import TextArea from "../continuous/TextArea";
import Button from "../continuous/Button";
import SelectCity from "../continuous/SelectCity";
import SelectNum from "../continuous/SelectNum";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function ItemRegister() {
  const navigate = useNavigate();

  const titulo = useRef();
  const ubicacion = useRef();
  const ciudad = useRef();
  const banios = useRef();
  const cuartos = useRef();
  const pisos = useRef();
  const tamanio = useRef();
  const precio = useRef();
  const description = useRef();

  const formData = useRef(null);
  const property = useRef()
  const users = useSelector(state => state.users)




  const handleOnClick = () => {
    switch(selection){
      case "casa": {
        fetch("http://localhost:8080/house/agent/" + users[0].id, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": users[0].token
          },
          body: JSON.stringify({
            name: titulo.current.value,
            description: description.current.value,
            price: precio.current.value,
            size: tamanio.current.value,
            location: ubicacion.current.value,
            bathRoomNum: banios.current.value,
            rooms: cuartos.current.value,
            floors: pisos.current.value,
            cityCode: ciudad.current.value,
          }),
        })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          navigate("/agentPage/");
        })
        break
      }
      case "local": {
        fetch("http://localhost:8080/premise/agent/" + users[0].id,{
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": users[0].token
          },
          body: JSON.stringify({
            name: titulo.current.value,
            description: description.current.value,
            price: precio.current.value,
            size: tamanio.current.value,
            location: ubicacion.current.value,
            cityCode: ciudad.current.value,
          }),
        })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          console.log(response.message);
          navigate("/agentPage/");
        });
        break
      } 
      case "terreno":{
        fetch("http://localhost:8080/plot/agent/" + users[0].id,{
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": users[0].token
          },
          body: JSON.stringify({
            name: titulo.current.value,
            description: description.current.value,
            price: precio.current.value,
            size: tamanio.current.value,
            location: ubicacion.current.value,
            cityCode: ciudad.current.value,
          }),
        })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          console.log(response.message);
          navigate("/agentPage/");
        });
        break
      } 
    } 
  };

  const handleOnChange = () =>{
    setSelection(property.current.value)
  }

  const [selection, setSelection] = useState("")

  useEffect(() =>{}, [selection])

  const typ = "text";
  const clas = "form-control inp";
  const idu = "user";
  const clas1 = "form-select form-select-sm";
  return (
    <>
      <div className="row fonlog">
        <div className="container">
          <div className="row align-items-center justify-content-center h100">
            <div className="col-10 logs">
              <div className="row mt">
                <h1 className="hs">Registro de Casa</h1>
              </div>
              <div className="row mb">
                <section className="col-6">
                  <div className="row justify-content-center mt">
                    <div className="col-10">
                      <select className="form-select" onChange={handleOnChange} aria-label=".form-select-sm example" ref={property}>
                        <option value="1" >propiedad</option>
                        <option value="local">local</option>
                        <option value="casa">casa</option>
                        <option value="terreno">terreno</option>
                      </select>
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    <Inputs Texto={"Titulo"} Type={typ} clas={clas} id={idu} xref={titulo}/>
                  </div>
                  <div className="row justify-content-center">
                    <Inputs
                      xref={ubicacion}
                      Texto={"Ubicacion"}
                      Type={typ}
                      clas={clas}
                      id={idu}
                    />
                  </div>
                  <div className="row justify-content-center">
                    <SelectCity titulo={"Lugar"} Texto={"Ciudad"} Type={typ} id={idu} optional={ciudad}/>
                  </div>
                  <section className="row justify-content-center">
                    <div className="col-10">
                      {selection == "casa" && (
                        <div className="row">
                          <div className="col">
                            <SelectNum titulo={"Baños"} clase={clas1} id={idu} optional={banios} Num={"Num Baños"}/>
                          </div>
                          <div className="col">
                            <SelectNum titulo={"Cuartos"} clase={clas1} id={idu} optional={cuartos} Num={"Num Cuartos"}/>
                          </div>
                          <div className="col">
                            <SelectNum titulo={"Pisos"} clase={clas1} id={idu} optional={pisos} Num={"Num Pisos"}/>
                          </div>
                        </div>
                      )}
                    </div>
                  </section>
                </section>
                <section className="col-6">
                  <div className="row justify-content-center">
                    <Inputs Texto={"Tamaño"} Type={typ} clas={clas} id={idu} xref={tamanio}/>
                  </div>
                  <div className="row justify-content-center">
                    <Inputs Texto={"Precio"} Type={typ} clas={clas} id={idu} xref={precio}/>
                  </div>
                  <div className="row justify-content-center">
                    <TextArea
                      Texto={"Descripcion"}
                      Type={typ}
                      clas={clas}
                      id={idu}
                      row={"4"}
                      xref={description}
                    />
                  </div>
                  <div className="row justify-content-center mt">
                    <div className= "col-10">
                      <form ref={formData}>
                        <input type={"file"} name="file" />
                      </form>
                    </div>
                  </div>
                </section>
              </div>
                <div className="row justify-content-center align-items-center mb ">
                  <div className="col-5">
                    <button type='button'className="btn btn-primary w100" onClick={handleOnClick}>aceptar</button>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ItemRegister;

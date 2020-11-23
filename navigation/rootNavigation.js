import React from 'react';

//creamos esta referencia para poder mover a los usuarios desde las
//notificaiones como no se puede accesar a navigate
//hacemos esto para pasarle la referencia
export const navigationRef = React.createRef();

//hacemos una func para navegar
const navigate = (name, params) => {
  //si current existe navegamos de caso contrario no pasa nada
  //para eso es el ?
  navigationRef.current?.navigate(name, params);
};

export default {
  navigate,
};

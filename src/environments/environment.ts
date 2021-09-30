// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API: {
    sucursalesUrl: "http://10.112.32.145:8000/api/sucursales/",
    usuariosUrl: "http://10.112.32.145:8000/api/users/",
    clientesUrl: "http://10.112.32.145:8000/api/clientes/",
    getSucursales: "http://10.112.32.145:8000/api/getSucursales",
    addUser: "http://10.112.32.145:8000/api/addUser",
    loginUrl: "http://10.112.32.145:8000/api/login/",
    logoutUrl: "http://10.112.32.145:8000/api/logout/",
    validarToken: "http://10.112.32.145:8000/api/validarToken/",
    me: "http://10.112.32.145:8000/api/me/"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

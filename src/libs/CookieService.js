import Cookies from 'universal-cookie';

const cookies = new Cookies();




class CookieService {
  get(key){
    console.log(cookies.get(key)); // Pacman
    return cookie.get(key)    ;
  }

  set(key:'',value:'',options:[]){
    cookie.set(key, value, options);
    console.log('cookie',cookie)
  }

  remove(key){
    cookie.remove(key);
  }

}

export default CookieService;

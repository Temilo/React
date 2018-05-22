import {observable} from 'mobx';

class WeatherStore {
  @observable temp= undefined
  @observable city= undefined
  @observable country= undefined
  @observable humidity= undefined
  @observable description= undefined
  @observable error= undefined
}


const store = new WeatherStore();
export default store;

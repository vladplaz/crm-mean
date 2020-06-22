declare var M

export class MaterialService{

  static toast(message){
    M.toast({html:message})
  }

}

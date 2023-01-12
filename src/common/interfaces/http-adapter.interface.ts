// NO puedo inject una Interface xq no se transpilan a JS, x defaul no es posible como en Sping
export interface HttpAdapter {
  get<T>(url: string): Promise<T>;
}

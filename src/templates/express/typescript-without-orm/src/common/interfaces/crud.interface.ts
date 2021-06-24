interface Crud<T> {
    list(): Promise<Array<T>>,
    find(id: string): Promise<T>,
    create(payload: T): Promise<T>,
    update(id: string, payload: T): Promise<T>,
    delete(id: string): Promise<T>
}

export default Crud;
interface Crud<Model, Payload> {
    list(limit: number, page: number): Promise<Array<Model>>,
    find(id: string): Promise<Model>,
    create(payload: Payload): Promise<Model>,
    update(id: string, payload: Payload): Promise<Model>,
    delete(id: string): Promise<Model>
}

export default Crud;
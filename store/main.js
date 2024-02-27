export class Store {
    constructor(storageKey) {
        this.storageKey = storageKey;
        this.data = this.loadData();
    }

    loadData() {
        // Intenta obtener los datos almacenados usando la storageKey.
        const storedData = localStorage.getItem(this.storageKey);
    
        // Verifica si storedData existe. Si no, inicializa con el estado predeterminado.
        if (!storedData) {
           this.initializeDefault();
           return;
        }
        // Si existen datos almacenados, los parsea y retorna.
        return JSON.parse(storedData);
    }
    

    initializeDefault() {
        // Define aquí el estado inicial predeterminado
        const defaultData = {};
        // Guarda el estado inicial en localStorage para futuras cargas
        localStorage.setItem(this.storageKey, JSON.stringify(defaultData));
        return defaultData;
    }

    saveData() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    }

    get(key) {
        return this.data[key];
    }

    getAll() {
        return { ...this.data };
    }

    set(key, value) {
        this.data[key] = value;
        this.saveData();
    }

    remove(key) {
        delete this.data[key];
        this.saveData();
    }
}
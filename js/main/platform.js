class Platform {
    constructor(mesh, show) {
        this._mesh = mesh;
        this._show  = show; // Tells when the platform should be shown
    }

    get mesh() {
        return this._mesh;
    }
    set mesh(x) {
        this._mesh = x;
    }
}
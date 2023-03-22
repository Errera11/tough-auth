module.exports = class ApiError extends Error{

    status;
    error;

    constructor(status, mes, error = []) {
        super(mes);
        this.status = status;
        this.error = error;

    }

    static UnauthorizedUser() {
        return new ApiError(401, "User unauthorized");
    }

    static BadRequest(mes, error) {
        return new ApiError(400, mes, error);
    }
}
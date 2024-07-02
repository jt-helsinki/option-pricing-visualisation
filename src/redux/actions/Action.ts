export interface Action<S, T> {
    type: S;
    payload: T;
}

export type SelectOption<T> = {
    label: string;
    value: T;
    isGroupHeader?: boolean;
}

export type GroupedSelectOption<T> = {
    label: string;
    options: SelectOption<T>[];
}
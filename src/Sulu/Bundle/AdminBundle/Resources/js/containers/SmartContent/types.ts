export type FilterCriteria = {
    audienceTargeting: boolean | null | undefined,
    // TODO rename to categoryIds
    categories: Array<number> | null | undefined,
    categoryOperator: Conjunction | null | undefined,
    // TODO rename to datasourceId
    dataSource: string | null | undefined | number,
    // TODO rename to includeSubElements
    includeSubFolders: boolean | null | undefined,
    // TODO rename to limit
    limitResult: number | null | undefined,
    // TODO rename to presentation
    presentAs: string | null | undefined,
    sortBy: string | null | undefined,
    // TODO rename to sortOrder
    sortMethod: SortOrder | null | undefined,
    tagOperator: Conjunction | null | undefined,
    tags: Array<string | number> | null | undefined,
    types: Array<string> | null | undefined
};

export type SortOrder = 'asc' | 'desc';

export type Conjunction = 'or' | 'and';

export type Sorting = {
    name: string | null | undefined,
    value: string
};

export type Presentation = {
    name: string,
    value: string
};

export type Type = {
    name: string,
    value: string
};

export type SmartContentConfig = {
    audienceTargeting: boolean,
    categories: boolean,
    datasourceAdapter?: string,
    datasourceListKey?: string,
    datasourceResourceKey?: string,
    limit: boolean,
    presentAs: boolean,
    resultToView?: {
        [key: string]: string
    },
    sorting: Array<Sorting>,
    tags: boolean,
    types: Array<Type>,
    view?: string
};

export type SmartContentConfigs = {
    [key: string]: SmartContentConfig
};

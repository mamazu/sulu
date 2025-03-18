export type Condition = {
    condition: any,
    type: string | null | undefined
};

export type Rule = {
    conditions: Array<Condition>,
    frequency: number,
    title: string
};

export type RuleType = {
    name: string,
    type: {
        name: string,
        options: any
    }
};

export type RuleTypes = {
    [key: string]: RuleType
};

export type RuleTypeProps = {
    onChange: (value: any) => void,
    options: any,
    value: any
};

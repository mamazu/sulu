export type Email = {
    email: string | null | undefined,
    emailType: number
};

export type Fax = {
    fax: string | null | undefined,
    faxType: number
};

export type Phone = {
    phone: string | null | undefined,
    phoneType: number
};

export type SocialMedia = {
    socialMediaType: number,
    username: string | null | undefined
};

export type Website = {
    website: string | null | undefined,
    websiteType: number
};

export type ContactDetailsValue = {
    emails: Array<Email>,
    faxes: Array<Fax>,
    phones: Array<Phone>,
    socialMedia: Array<SocialMedia>,
    websites: Array<Website>
};

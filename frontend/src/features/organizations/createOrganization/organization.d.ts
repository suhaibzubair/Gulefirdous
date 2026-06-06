export interface Organization {
    OrganizationName: string;
    OrgUrl:string;
    companyURL: string;
    Thumbnail: string;
    currency:string;
    timezone:string;
    language:string;
}


export const SchoolinitialValue={
    textTitle: '',
    textUrl: '',
    password: '',
    currancy: '',
    language: '',
    country: '',
    timeZone: '',
    yourIdentity: '',
    currentlyWorkingPeople: '',
    industryName: '',
    isAlreadyHaveBusiness: '',
    isAlreadyHavemail: '',
}

export interface ModalOrganizationData {
    modalTimezone: string;
    modalLanguage: string;
    modalCurrency: string;
  }

// export const SchoolinitialValue={
//     textTitle: '',
//     textUrl: '',
//     password: '',
//     currancy: '',
//     language: '',
//     country: '',
//     timeZone: '',
//     yourIdentity: '',
//     currentlyWorkingPeople: '',
//     industryName: '',
//     isAlreadyHaveBusiness: '',
//     isAlreadyHavemail: '',
// }

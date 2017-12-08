// tslint:disable-next-line:class-name
class reqDatas {
    public title?: string;
    public group?: string[];
    public pdzhi?: number;
}

// tslint:disable-next-line:max-classes-per-file
// tslint:disable-next-line:class-name
class recDatas {
    public data?: string;
    public rootkey?: string;
    public rootname?: string;
}

// tslint:disable-next-line:max-classes-per-file
// tslint:disable-next-line:class-name
class wrapDatas {
    public data?: string;
    public rootkey?: string;
    public rootname?: string;
    public pdzhi?: number | string;
    public erjipdzhi?: number | string;
    public sanjipdzhi?: number | string;
    public userInpVal?: string | null;
    public userPwdVal?: string | null;
    public userYZVal?: string | null;
    public userEmailVal?: string | null;
    public userAUTHVal?: any | null;
}

export {wrapDatas, reqDatas, recDatas};

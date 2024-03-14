/*
Place all interfaces and types here
*/

export interface Building {
    _id: string;
    name: string;
    address?: string;
    city?: string;
    state?: string;
    zipcode?: string;
    BUID?: string;
    alias?: string;
    buildingOwner?: User[] | string[]; // this is an array if there are multiple owners
    propertyManager?: User[] | string[]; 
    serviceContractor?:User[] | string[]; 

    contactPhone?: string;
    contactEmail?: string;

  // devices (devices are stored in gateways)
    gateways?: Gateway[] | string;

    imageLink?: string;
    suites?: Suite[] | string;

    keys: {
        dt_projectId?: string;
        dt_secret?: string;
        dt_email?: string;
        dt_key_id?: string;
        paragon_securityDomain?: string;
        paragon_username?: string;
        paragon_password?: string;
        ambient_apiKey?: string;
        ambient_applicationKey?: string;
        vataverks_token?: string;
    };

    assetData?: {
        hasGreenButton?: boolean;
        // electric
        electricCompanyName?: string; // electric company name
        electricAccountNumber?: string; // acc number
        electricAssets?: Asset[] | string;

        // gas
        gasCompanyName?: string;
        gasAccountNumber?: string;
        gasAssets?: Asset[] | string[];

        // water
        waterCompanyName?: string;
        waterAccountNumber?: string;
        waterAssets?: Asset[] | string[];

        // misc
        electricLiability?: string;
        gasLiability?: string;
        waterLiability?: string;

        // hvac
        HVACCount?: number;
        HVACShared?: boolean;
        HVACAssets?: Asset[] | string[];

        // thermostat
        thermostatAssets?: Asset[];

        // water heater:
        waterHeaterCount?: number;
        waterHeaterAssets?: Asset[];
    };

    options?: {
        generatedAlerts?: boolean;
        userReportedAlerts?: boolean;
    };

  // misc info
    type?: string;
    buildingSqFt?: number;
    floorCount?: number;
    suiteCount?: number;
    commonAreaCount?: number;
    sharedRestroomCount?: number;
    undergroundParking?: boolean;
    EVCharging?: boolean;
    EVChargerCount?: number;
    // daysOccupied: string[];
    description?: string;

}

export interface User {
    _id: string;
    name: string;
    username: string;
    email: string;
    phone?: string;
    permissions?: string;
    buildings?: Building[] | string[];
    tenants?: Tenant[] | string[];
}

export interface Tenant {
    _id: string;
    name: string;
    buildingId: string;
    suiteId: string;
    businessType?: string;
    description?: string;
    typeOfLease?: string;
    leaseEndDate?: Date | string;
    users?: User[] | string[];
    inviteCode: string;
}

export interface Suite {
    _id: string;
    buildingId: string;
    suite?: string;
    tenant?: Tenant;
    occupied?: boolean;
    squareFootage?: number;
}

export interface Alert {
    _id: string;
    alert_id: string;
    alert_desc?: string;
    deviceId?: string;
    buildingId: string;
    location_desc?: string;
    description?: string;
    poster?: User;
    status?: string;
    assignedPersonnel?: User;
}


export interface Device {
    _id: string;
    device: string; // user-defined name
    deviceSource: string; // will be either 'DisruptiveTechnologies', 'ParagonRobotics', or 'AmbientWeather', required
    loggerType: string;
    DUID?: string;
    gatewayId?: Gateway[] | string[];
    location?: {
      buildingId?: Building[] | string[];
      suiteId?: Suite[] | string[];
      data?: string;
      asset?: Asset[] | string[];
      outdoors?: boolean; // default: false
    };
    
    targetName?: string; // for dt devices
    projectId?: string; // for dt devices
    sensorId?: string; // for dt devices
    devicePath?: string; // for PR devices, the URL path for the API
    deviceModel?: string; // for PR devices, the DB## / N## models that should be universally the same
    machines?: {
      sensorType?: string;
      sensorPath?: string;
    }[]; // for PR devices
    macAddress?: string; // for Ambient Weather devices
    ambientDeviceId?: string; // for Ambient Weather devices
    vataverksToken?: string; // for vataverks devices
    utilityType?: string; // gas, electric, water
  }

export interface Gateway {
    _id: string;
    location?: string;
    name: string;
    sourceAPI: string;
    buildingId: string;
    devices?: Device[] | string[];
}

export interface Invite {
    _id: string;
    from: User | string;
    to: User | string;
    inviteType: string;
    data: {
        role: string;
        tenantId?: string;
        buildingId?: string;
    }
}

export interface UtilityBill {
    createdAt: Date | string;
    startDate?: Date | string;
    endDate?: Date | string;
    type: string;
    location?: {
        buildingId?: string;
        suiteId?: string;
    }
    data?: Object;
}

export interface Asset {
    _id: string;
    buildingId: string;
    name: string;
    assetType: string;
    images?: string[];
    manufacturer?: string;
    modelNumber?: string;
    serialNumber?: string;
    location?: string;
    HVACType?: string;
    supports?: Suite[] | string[];
    warrantyExpiration?: Date | string;
    lastService?: Date | string;
    serviceContract?: boolean;
    HVACSettings?: {
        compressorCount?: number;
        comp1PH?: number;
        comp1RLA?: number;
        comp1LRA?: number;
        comp2PH?: number;
        comp2RLA?: number;
        comp2LRA?: number;
        comp3PH?: number;
        comp3RLA?: number;
        comp3LRA?: number;
        fanPH?: number;
        fanFLA?: number;
        fanHP?: number;
    };
    thermostatSettings?: {
        occupiedHeat?: number;
        unoccupiedHeat?: number;
        occupiedCooling?: number;
        unoccupiedCooling?: number;
        weekdayOccupiedStartTime?: string;
        weekdayUnoccupiedStartTime?: string;
        weekendOccupiedStartTime?: string;
        weekendUnoccupiedStartTime?: string;
        fanSetting?: string;
        hasBatteries?: boolean;
        batteriesLastChanged?: Date | string;
    };
    waterHeaterSettings?: {
    waterTemperature?: number;
    };
    energySource?: string;
    dateInstalled?: Date | string;
    occupiedDays?: string[];
}
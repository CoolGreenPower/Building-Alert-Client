export const navLinks = [
    {
        "id": "",
        "title": "Dashboard",
        "url": "/"
    },
    {
        "id": "createbuilding",
        "title": "Create Building",
        "url": `${import.meta.env.VITE_BASE_URL}/adminforms/createbuilding`
    },
    {
      "id": "adddevices",
      "title": "Add Devices",
      "url": `${import.meta.env.VITE_BASE_URL}/adminforms/adddevices`
    },
    {
      "id": "addassets",
      "title": "Add Assets",
      "url": "/addassets"
    },
    {
      "id": "addutilities",
      "title": "Add Utilities",
      "url": "/addutilities"
    }
]

export const buildingViewSections = [
    {
        "id": "details",
        "title": "Details"
    },
    {
        "id": "users",
        "title": "Users"
    },
    {
        "id": "assets",
        "title": "Assets"
    },
    {
        "id": "devices",
        "title": "Devices"
    },
    {
        "id": "gateways",
        "title": "Gateways"
    },
    {
        "id": "suites",
        "title": "Suites"
    },
    {
        "id": "tenants",
        "title": "Tenants"
    },
    {
        "id": "utilities",
        "title": "Utility Bills"
    }

]

export const buildingDetailsFields = [
    {
      type: "text",
      name: "name",
      label: "Name",
    },
    {
      type: "text",
      name: "alias",
      label: "Alias",
      required: true
    },
    {
      type: "text",
      name: "BUID",
      label: "BUID",
    },
    {
      array: true,
      type: "text",
      name: "buildingOwner",
      label: "Building Owners (Separated by commas)",
      disabled: true
    },
    {
      array: true,
      type: "text",
      name: "propertyManager",
      label: "Property Managers (Separated by commas)",
      disabled: true
    },
    {
      array: true,
      type: "text",
      name: "serviceContractor",
      label: "Service Contractors (Separated by commas)",
      disabled: true
    },
    {
      type: "text",
      name: "address",
      label: "Address",
    },
    {
      type: "text",
      name: "city",
      label: "City",
    },
    {
      type: "text",
      name: "state",
      label: "State (MA)",
    },
    {
      type: "text",
      name: "zipcode",
      label: "Zipcode",
    },
    {
      type: "tel",
      name: "contactPhone",
      label: "Phone Number",
    },
    {
      type: "email",
      name: "contactEmail",
      label: "Email",
    },
    {
        type: "text",
        name: "gateways",
        label: "Gateways (Separated by commas)",
        array: true,
        disabled: true
    },
    {
        type: "image",
        name: "imageLink",
        label: "Image",
    },
    {
        type: "text",
        name: "suites",
        label: "Suites",
        array: true
    },
    {
        type: "password",
        name: "keys",
        label: "Keys",
        object: true
    },
    {
        type: "text",
        name: "assetData",
        label: "Asset Data (Adding an asset requires the _id) (Separated by commas and no spaces)",
        object: true,
    }
  
]


export const userViewSections = [
  {
    "id": "details",
    "title": "Details"
  },
  {
    "id": "buildings",
    "title": "Buildings"
  },
  {
    "id": "tenants",
    "title": "Tenants"
  },
]
export const userDetailsFields = [
  {
    type: "text",
    name: "name",
    label: "Name",
  },
  {
    type: "text",
    name: "_id",
    label: "User _id",
    required: true,
    disabled: true
  },
  {
    type: "text",
    name: "username",
    label: "Username",
    required: true
  },
  {
    type: "email",
    name: "email",
    label: "Email",
    required: true
  },
  {
    type: "tel",
    name: "phone",
    label: "Phone Number",
  },
  {
    type: "password",
    name: "password",
    label: "Password",
    disabled: true
  },
  {
    type: "text",
    name: "permissions",
    label: "Permissions (Role)",
  },
  {
    array: true,
    type: "text",
    name: "parentBuildings",
    label: "Parent Buildings (Building Groups)",
    disabled: true
  },
  {
    type: "text",
    name: "buildings",
    label: "Buildings (Top level user of building aka. buildingOwner, propertyManager, serviceContractor)",
    array: true,
    disabled: true
  },
  {
    type: "text",
    name: "tenants",
    label: "Tenants (Separated by commas). What tenants the user is a part of",
    array: true
  },
  {
    type: "text",
    name: "verified",
    label: "Verified",
    disabled: true
  },
  {
    type: "text",
    name: "createdAt",
    label: "Created At",
    disabled: true
  }
]

export const assetDetailsFields = [
  {
    type: "text",
    name: "name",
    label: "Name",
    required: true
  },
  {
    type: "text",
    name: "_id",
    label: "Asset _id",
    required: true,
    disabled: true
  },
  {
    type: "text",
    name: "AUID",
    label: "Asset UID"
  },
  {
    type: "text",
    name: "buildingId",
    label: "Building ID",
    required: true
  },
  {
    type: "text",
    name: "assetType",
    label: "Asset Type",
    required: true
  },
  {
    array: true,
    type: "text",
    name: "images",
    label: "Images",
  },
  {
    type: "text",
    name: "manufacturer",
    label: "Manufacturer",
  },
  {
    type: "text",
    name: "modelNumber",
    label: "Model Number",
  },
  {
    type: "text",
    name: "serialNumber",
    label: "Serial Number",
  },
  {
    type: "text",
    name: "location",
    label: "Location",
  },
  {
    type: "text",
    name: "HVACType",
    label: "HVAC Type",
  },
  {
    type: "text",
    name: "supports",
    label: "Supports",
  },
  {
    type: "text",
    name: "supportedSuites",
    label: "Suites Supported",
    disabled: true,
    array: true
  },
  {
    type: "text",
    name: "warrantyExpiration",
    label: "Warranty Expiration (ISO Date)",
  },
  {
    type: "text",
    name: "lastService",
    label: "Last Service (ISO Date)",
  },
  {
    type: "text",
    name: "serviceContract",
    label: "Service Contract (true/false)",
  },
  {
    type: "text",
    name: "HVACSettings",
    label: "HVAC Settings",
    object: true
  },
  {
    type: "text",
    name: "thermostatSettings",
    label: "Thermostat Settings",
    object: true
  },
  {
    type: "text",
    name: "waterHeaterSettings",
    label: "Water Heater Settings",
    object: true
  },
  {
    type: "text",
    name: "energySource",
    label: "Energy Source",
  },
  {
    type: "text",
    name: "dateInstalled",
    label: "Date Installed (ISO Date)",
  },
  {
    type: "text",
    name: "occupiedDays",
    label: "Occupied Days (Separated by commas)",
    array: true
  },


]

export const deviceDetailsFields = [
  {
    type: "text",
    name: "device",
    label: "Device Name",
  },
  {
    type: "text",
    name: "_id",
    label: "Device _id",
    required: true,
    disabled: true
  },
  {
    type: "text",
    name: "DUID",
    label: "Device UID",
  },
  {
    type: "text",
    name: "loggerType",
    label: "Logging Collection",
  },
  {
    type: "text",
    name: "gatewayId",
    label: "Gateway ID",
    disabled: true
  },
  {
    type: "text",
    name: "location",
    label: "Location (refrain from changing id fields)",
    object: true
  },
  {
    type: "text",
    name: "deviceSource",
    label: "Device Source",
  },
  {
    type: "text",
    name: "targetName",
    label: "Target Name (DT Devices only)",
  },
  {
    type: "text",
    name: "projectId",
    label: "Project ID (DT Only)",
  },
  {
    type: "text",
    name: "sensorId",
    label: "Sensor ID",
  },
  {
    type: "text",
    name: "devicePath",
    label: "Device Path (PR Only)",
  },
  {
    type: "text",
    name: "deviceModel",
    label: "Device Model (Required for PR)",
  },
  {
    type: "text",
    name: "machines",
    label: "PR Machines (For PR only)",
    object: true,
    objectArr: true,
    rawOutput: true
  }
]

export const suiteDetailsFields = [
  {
    type: "text",
    name: "suite",
    label: "Suite Name",
    required: true
  },
  {
    type: "text",
    name: "_id",
    label: "Suite _id",
    required: true,
    disabled: true
  },
  {
    type: "text",
    name: "buildingId",
    label: "Building ID",
    required: true,
    disabled: true
  },
  {
    type: "text",
    name: "tenant",
    label: "Tenant Id (To modify this, there should be a form or button to remove the tenant or add a tenant by _id. For now, no such functionality",
    disabled: true
  },
  {
    type: "text",
    name: "occupied",
    label: "Occupied (true/false)",
  },
  {
    type: "number",
    name: "squareFootage",
    label: "Square Footage",
  }


]

export const tenantDetailsFields = [
  {
    type: "text",
    name: "name",
    label: "Name",
    required: true
  },
  {
    type: "text",
    name: "_id",
    label: "Tenant ID",
    required: true,
    disabled: true
  },
  {
    type: "text",
    name: "buildingId",
    label: "Building ID",
    required: true,
    disabled: true
  },
  {
    type: "text",
    name: "suiteId",
    label: "Suite ID",
    required: true,
    disabled: true
  },
  {
    type: "text",
    name: "businessType",
    label: "Business Type",
  },
  {
    type: "text",
    name: "description",
    label: "Description",
  },
  {
    type: "text",
    name: "typeOfLease",
    label: "Type of Lease",
  },
  {
    type: "text",
    name: "leaseEndDate",
    label: "Lease End Date (ISO Date)",
  },
  {
    type: "text",
    name: "users",
    label: "Users (if you add/remove a user, you must update their tenant list)",
    array: true
  }

]

export const gatewayViewSections = [
  {
      "id": "details",
      "title": "Details",
  },
  {
      "id": "devices",
      "title": "Devices",
  }
]

export const gatewayDetailsFields = [
  {
      "type": "text",
      "name": "_id",
      "label": "Gateway _id",
      "required": true,
  },
  {
      "type": "text",
      "name": "sourceAPI",
      "label": "Source API",
      "required": true,
  },
  {
      "type": "text",
      "name": "buildingId",
      "label": "Building _id",
      "required": true,
      "disabled": true
  },
  {
      "type": "text",
      "name": "location",
      "label": "Location",
  }
]
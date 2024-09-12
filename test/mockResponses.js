module.exports = {
  success: {
    status: 200,
    data: [{
      "id": "jp.smartcity-yaizu.DisasterPreventionHeliport.12",
      "type": "Heliport",
      "Class": {
        "type": "Class",
        "value": {
          "Type": { "type": "Text", "value": "区分" },
          "TypeReletedInformation": { "type": "Text", "value": "防災ヘリポート" }
        },
        "metadata": {}
      },
      "ContactPointInformation": {
        "type": "ContactPointInformation",
        "value": { "ContactPointPhoneNumber": { "type": "Text", "value": "" } },
        "metadata": {}
      },
      "EquipmentAddress": {
        "type": "EquipmentAddress",
        "value": {
          "LocalGovernmentCode": { "type": "Text", "value": "222127" },
          "StreetAddressID": { "type": "Text", "value": "" },
          "Prefecture": { "type": "Text", "value": "静岡県" },
          "CityAndCounty": { "type": "Text", "value": "焼津市" },
          "StreetAddress": { "type": "Text", "value": "" },
          "CityBlock": { "type": "Text", "value": "" },
          "BuildingName_etc": { "type": "Text", "value": "" },
          "FullAddress": { "type": "Text", "value": "静岡県焼津市石津421-3" },
          "Latitude": { "type": "Number", "value": 34.841823 },
          "Longitude": { "type": "Number", "value": 138.31503 },
          "UTMPoint": { "type": "Text", "value": "54STD54495879" }
        },
        "metadata": {}
      },
      "Identification": {
        "type": "Text",
        "value": "12",
        "metadata": {
          "batch_execution_id": {
            "type": "Text",
            "value": "c9d424a85c183762a01e5de6db2752fb"
          }
        }
      },
      "Name": { "type": "Text", "value": "石津西公園", "metadata": {} },
      "NameEN": { "type": "Text", "value": "", "metadata": {} },
      "NameKana": {
        "type": "Text",
        "value": "イシヅニシコウエン",
        "metadata": {}
      },

    }]
  },
  partialData: {
    status: 200,
    data: [{
      "id": "jp.smartcity-yaizu.DisasterPreventionHeliport.12",
      "type": "Heliport",
      "EquipmentAddress": {
        "type": "EquipmentAddress",
        "value": {
          "FullAddress": { "type": "Text", "value": "静岡県焼津市石津421-3" },
          "Latitude": { "type": "Number", "value": 34.841823 },
        },
        "metadata": {}
      }
    }]
  },
  emptyData: {
    status: 200,
    data: []
  },
  nullData: {
    status: 200,
    data: null
  },
  nonExistData: {
    status: 200
  },
  clientError: {
    status: 400,
    data: []
  },
  serverError: {
    status: 500,
    data: []
  }
};


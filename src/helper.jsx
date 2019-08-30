let index = 0;
/* accepts the JSON, the identifier which contains the list to iterate on, items and groups arrays */

export const generateNodelist = (json, identifier, items, groups, startIndex) => {
  let metrics = json[identifier]; //cache the object and use the references everywhere to avoid lookups
  if(metrics) {
    const obj = {
      key: json.name,
      name: json.name,
      startIndex,
      count: metrics.length
    };
    
    groups.push(obj);
    
    if(metrics.length > 0) {
      for(let i=0; i<metrics.length; i++)
      {
        items.push({
          id: metrics[i].id,
          name: metrics[i].name
        }); 
        generateNodelist(metrics[i], identifier, items, groups, startIndex);
      }
      index++;
    }
  }
  return {
    items,
    groups
  };
}

export const responseData = [
  {
    name: 'Timing',
    id: 1,
    category:0,
    metrics:[
      {
        testType:[0,1],
        id: 2,
        metric: 0,
        count: 0,
        name: 'Response1',
        unit: 'ms',
      },
      {
        testType:[0,1],
        id: 3,
        metric: 0,
        count: 0,
        name: 'Response2',
        unit: 'ms',
      },
      {
        testType:[0,1],
        id: 4,
        metric: 0,
        count: 0,
        name: 'Response3',
        unit: 'ms',
      }
    ]
  },
  {
    name: 'Category',
    category:1,
    id: 5,
    metrics:[
      {
        testType:[1,2,3],
        id: 6,
        metric: 1,
        count: 0,
        name: 'Metric',
        unit: 'ms',
      }
    ]
  }
];
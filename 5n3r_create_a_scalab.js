// Data Model for Scalable Data Visualization Parser

class DataPoint {
  constructor(id, value, category) {
    this.id = id;
    this.value = value;
    this.category = category;
  }
}

class DataSeries {
  constructor(id, name, color, dataPoints) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.dataPoints = dataPoints;
  }
}

class DataVisualization {
  constructor(id, title, dataSeries) {
    this.id = id;
    this.title = title;
    this.dataSeries = dataSeries;
  }

  addDataSeries(dataSeries) {
    this.dataSeries.push(dataSeries);
  }

  removeDataSeries(dataSeriesId) {
    this.dataSeries = this.dataSeries.filter(series => series.id !== dataSeriesId);
  }

  getDataForCategory(category) {
    return this.dataSeries.reduce((accum, series) => {
      accum.push(...series.dataPoints.filter(point => point.category === category));
      return accum;
    }, []);
  }

  static fromJSON(jsonData) {
    const dataVisualization = new DataVisualization(
      jsonData.id,
      jsonData.title,
      jsonData.dataSeries.map(series => {
        return new DataSeries(
          series.id,
          series.name,
          series.color,
          series.dataPoints.map(point => new DataPoint(point.id, point.value, point.category))
        );
      })
    );
    return dataVisualization;
  }
}

module.exports = DataVisualization;
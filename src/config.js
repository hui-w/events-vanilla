const Config = {
  ApiUrl: process.env.NODE_ENV === 'development' ?
    'http://events-vanilla.app.qlike.com/api' :
    '/api',
  FlagColors: process.env.NODE_ENV === 'development' ?
    ['#666666', '#999999', '#CCCCCC', '#FFFFFF'] :
    ['#FFFFFF', '#E51C24', '#259B23', '#3F51B5', '#FF9700', '#FFEB3C', '#9E9E9E', '#9C27B3'],
  RecurrenceTypes: ['None', 'Weekly', 'Monthly', 'Yearly']
};

export default Config;

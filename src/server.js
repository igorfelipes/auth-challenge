import app from './app';

app.listen(process.env.PORT || 3333, () => {
  console.log('App running at port 3333\n');
});
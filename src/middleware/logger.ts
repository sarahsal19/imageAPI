import morgan, { StreamOptions } from 'morgan';

//This function is for logging only, it was taken directly from Mr. Mohemmed Elshafey repo
const stream: StreamOptions = {
  write: (message) => console.log(message),
};

// Build the morgan middleware
export const morganMiddleware = morgan(
  ':method :url :status :response-time ms',
  { stream }
);

export default morganMiddleware;

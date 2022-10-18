//This interface represent the query fields
interface urlQuery {
  filename: string
  width: number
  height: number
}

// This method checks if all parameters are sent in the URL and that width and hieght are numbers
const validateParameters = (
  query: urlQuery
): boolean => {
  const parameters: string[] = [
    'filename',
    'width',
    'height',
  ];
  const paramsKeys: string[] = Object.keys(query);
  const isAllParametersThere: boolean =
    parameters.every(
      (item) => paramsKeys.indexOf(item) !== -1
    );
  const isAllNumbers: boolean = [
    Number(query.width),
    Number(query.height),
  ].every((item) => Number.isInteger(item));

  return isAllParametersThere && isAllNumbers;
};

export { urlQuery, validateParameters };

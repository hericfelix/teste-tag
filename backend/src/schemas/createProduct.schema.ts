import * as yup from 'yup';

const createProductSchema = yup.object().shape({
  name: yup.string().required(),
  status: yup.string().oneOf(['a', 'i', 'd']).required(),
  category: yup.string().required(),
});

export default createProductSchema;

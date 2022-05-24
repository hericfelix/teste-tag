import * as yup from 'yup';

const updateProductSchema = yup.object().shape({
  name: yup.string(),
  status: yup.string().oneOf(['a', 'i', 'd']),
  category: yup.string(),
});

export default updateProductSchema;

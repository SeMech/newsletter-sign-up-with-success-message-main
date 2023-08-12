import {createStore} from 'solid-js/store'

const checkValid = async ({ element, validators = [] }, setErrors) => {
  let message = null

  for (const validator of validators) {
    const text = await validator(element.value);
    if (text) {
      message = text;
      break;
    }
  }

  if (message) {
    setErrors({ [element.name]: message })
  }
}

export const useForm = () => {
  const
    [errors, setErrors] = createStore({}),
    [fields, setFields] = createStore({})

  const validate = (ref, accessor) => {
    const accessorValue = accessor()
    const validators = Array.isArray(accessorValue) ? accessorValue : [];
    const config = { element: ref, validators, value: ref.value }
    setFields({ [ref.name]: config })

    ref.onblur = () => checkValid(config, setErrors)
    ref.oninput = () => {
      if (!errors[ref.name]) return
      setErrors({ [ref.name]: undefined })
    }
  }

  const input = (ref) => {
    ref.addEventListener('input', (event) => {
      setFields(ref.name, 'value', event.target.value)
    })
  }

  const formSubmit = (ref, accessor) => {
    const callback = accessor() || (() => {})

    ref.setAttribute('novalidate', '')
    /** @param {SubmitEvent} event */
    ref.onsubmit = async (event) => {
      event.preventDefault()
      let errored = false

      for (const k in fields) {
        const field = fields[k]
        await checkValid(field, setErrors)

        if (!errored && errors[field.element.name]) {
          field.element.focus();
          errored = true;
        }
      }

      !errored && callback(ref);
    }
  }

  return { validate, formSubmit, input, errors, setFields, fields };
}

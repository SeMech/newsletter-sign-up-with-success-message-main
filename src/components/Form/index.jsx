import {createMemo, createSignal, For} from 'solid-js'
import style from './style.module.scss'
import {useForm} from '../../utils/useForm'
import {validateEmail} from '../../utils/validateEmail'
import classNames from 'classnames'

const formList = [
  'Product discovery and building what matters',
  'Measuring to ensure updates ate a success',
  'And much more!'
]

export function Form() {
  const {
    validate, formSubmit, input,
    errors, fields
  } = useForm()

  const [isSentForm, setIsSentForm] = createSignal(false)
  const emailError = createMemo(() => errors['email'])
  const emailValue = createMemo(() => fields['email']?.value || 'ash@loremcompany.com')

  const sendForm = () => {
    setIsSentForm(true)
  }

  return <>
    {isSentForm()
      ? <div class={style.successContainer}>
        <div class={style.contentContainer}>
          <div class={style.successIcon} />
          <div class={style.title}>Thanks for subscribing!</div>
          <div class={style.description}>
            A confirmation email has been sent to<br />
            <b>{emailValue()}</b>.
            Please open it and click the button inside to confirm your subscription.
          </div>
        </div>
        <button type="button" class={style.okButton} onClick={() => setIsSentForm(false)}>Dismiss message</button>
      </div>
      : <form class={style.formContainer} use:formSubmit={sendForm}>
        <div class={style.image}/>
        <div class={style.content}>
          <div class={style.title}>Stay updated!</div>
          <div class={style.description}>
            Join 60,000+ product managers receiving monthly updates on:
          </div>
          <div class={style.list}>
            <For each={formList}>
              {listItem => (
                <div class={style.row}>{listItem}</div>
              )}
            </For>
          </div>
          <div class={classNames(style.inputWrapper, emailError() && style.errorState)}>
            <div class={style.labelWrapper}>
              <label class={style.label} for="emailInputID">Email address</label>
              {emailError() && <span class={style.labelError}>{emailError()}</span>}
            </div>
            <input
              class={style.input}
              type="email"
              name="email"
              id="emailInputID"
              placeholder="email@company.com"
              use:validate={[validateEmail]}
              use:input
            />
          </div>
          <button class={style.sendButton} type="submit">
            Subscribe to monthly newsletter
          </button>
        </div>
      </form>}
    </>
}

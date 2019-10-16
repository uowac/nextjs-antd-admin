/**
 * Description: Sculpture create page component
 * Author: Hieu Chu
 */

import { useState } from 'react'
import SculptureCreate from './SculptureCreate'
import SculptureUploadImage from './SculptureUploadImage'
const CreateForm = () => {
  const [step, setStep] = useState(1)
  const [sculpture, setSculpture] = useState({})

  if (step === 1) {
    return <SculptureCreate setStep={setStep} setSculpture={setSculpture} />
  } else if (step === 2) {
    return <SculptureUploadImage sculpture={sculpture} />
  }
}

export default CreateForm

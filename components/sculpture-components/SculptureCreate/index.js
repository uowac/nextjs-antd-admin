import { useState } from 'react'
import SculptureCreate from './SculptureCreate'
import SculptureUploadImage from './SculptureUploadImage'
const CreateForm = () => {
  const [step, setStep] = useState(2)
  const [sculpture, setSculpture] = useState({
    accessionId: '2106.xx',
    name: 'my sculpture 2',
    longitude: '150.8946248',
    latitude: '-34.3721916',
    productionDate: null,
    material: 'dark'
  })

  if (step === 1) {
    return <SculptureCreate setStep={setStep} setSculpture={setSculpture} />
  } else if (step === 2) {
    return <SculptureUploadImage sculpture={sculpture} />
  }
}

export default CreateForm

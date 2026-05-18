import LabPageTemplate from './LabPageTemplate'
import ElectrolysisSimulator from '../../components/simulators/ElectrolysisSimulator'

export default function ElectrolysisPage() {
  return (
    <LabPageTemplate
      labId="electrolysis"
      color="#2d9e44"
      bgLight="#e6f4ea"
      emoji="⚡"
      simulator={<ElectrolysisSimulator />}
      youtubeId="VyLIBOQrfQ4"
      nextRoute="/labs/flame-test"
    />
  )
}

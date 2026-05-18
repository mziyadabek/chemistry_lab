import LabPageTemplate from './LabPageTemplate'
import TitrationSimulator from '../../components/simulators/TitrationSimulator'

export default function TitrationPage() {
  return (
    <LabPageTemplate
      labId="titration"
      color="#1a73e8"
      bgLight="#e8f0fe"
      emoji="🧪"
      simulator={<TitrationSimulator />}
      youtubeId="WMRHBCYtBkc"
      nextRoute="/labs/electrolysis"
    />
  )
}

import LabPageTemplate from './LabPageTemplate'
import FlameTestSimulator from '../../components/simulators/FlameTestSimulator'

export default function FlameTestPage() {
  return (
    <LabPageTemplate
      labId="flame-test"
      color="#ff6d00"
      bgLight="#fff3e0"
      emoji="🔥"
      simulator={<FlameTestSimulator />}
      youtubeId="v7wnbGBNFAA"
      nextRoute={null}
    />
  )
}

import AppHeader from '../../components/AppHeader'
import ActionField from '../../modules/ActionField/ActionField'
import KanbanBoard from '../../modules/KanbanBoard'

const HomePage = () => {
  return (
    <>
      <AppHeader />
      <ActionField />
      <KanbanBoard />
    </>
  )
}

export default HomePage
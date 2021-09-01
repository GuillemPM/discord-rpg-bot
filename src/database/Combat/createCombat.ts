import { CombatAttributes } from "./CombatAttributes"
import { Combat } from "./Model/Combat"

export const createNewCombat = (id: string, avtrId: string, mbId: string) =>{
  const newCombat = new Combat
  newCombat.set('combatId', id)
  newCombat.set('avatarId', avtrId)
  newCombat.set('mobId', mbId)

  newCombat.save()
}

import ComebackButton from '@/app/components/button/comeback'
import UserList from '@/app/components/display/registered-users'
import { Navigation } from '@/app/components/navigation/navigation'
import { Users } from '@/app/schemas/userSchema'
import { UserService } from '@/app/services/userService'
import '../style.css'

export default async function Page() {
  const users: Users = await UserService.getUsers()

  return (
    <div>
      {/* Navbar */}
      <Navigation />
      <UserList usersData={users} />

      <ComebackButton />
    </div>
  )
}

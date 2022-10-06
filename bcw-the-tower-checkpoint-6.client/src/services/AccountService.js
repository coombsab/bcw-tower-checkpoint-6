import { AppState } from '../AppState'
import { Ticket } from "../models/Ticket"
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async getTicketsByAccountId() {
    AppState.tickets = []
    const res = await api.get("/account/tickets")
    AppState.tickets = res.data.map(data => new Ticket(data))
  }
}

export const accountService = new AccountService()

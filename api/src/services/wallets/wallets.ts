import type {
  QueryResolvers,
  MutationResolvers,
  WalletRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const wallets: QueryResolvers['wallets'] = () => {
  return db.wallet.findMany()
}

export const wallet: QueryResolvers['wallet'] = ({ id }) => {
  return db.wallet.findUnique({
    where: { id },
  })
}

export const createWallet: MutationResolvers['createWallet'] = ({ input }) => {
  return db.wallet.create({
    data: input,
  })
}

export const updateWallet: MutationResolvers['updateWallet'] = ({
  id,
  input,
}) => {
  return db.wallet.update({
    data: input,
    where: { id },
  })
}

export const deleteWallet: MutationResolvers['deleteWallet'] = ({ id }) => {
  return db.wallet.delete({
    where: { id },
  })
}

export const Wallet: WalletRelationResolvers = {
  user: (_obj, { root }) => {
    return db.wallet.findUnique({ where: { id: root?.id } }).user()
  },
  walletTransactions: (_obj, { root }) => {
    return db.wallet
      .findUnique({ where: { id: root?.id } })
      .walletTransactions()
  },
  club: (_obj, { root }) => {
    return db.wallet.findUnique({ where: { id: root?.id } }).club()
  },
  organization: (_obj, { root }) => {
    return db.wallet.findUnique({ where: { id: root?.id } }).organization()
  },
}

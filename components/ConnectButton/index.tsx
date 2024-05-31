"use client"
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { Button } from '../ui/button'

export default function ConnectButton() {
  // 4. Use modal hook
  const { open } = useWeb3Modal()

  return (
    <>
      <Button onClick={() => open()}>Connect</Button>
    </>
  )
}
import Image from "next/image"
import Link from "next/link"
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  Home,
  LineChart,
  ListFilter,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  Truck,
  Users2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { AccountDropdown } from "../AccountDropdown"
import { Aside } from "../Aside"
import CardElement from "../CardElement"
import AddBTCForm from "../AddBTCForm"
import WatcherComponent from "../WatcherComponent"
import UnstakeButton from "@/components/PayBackForm";
import { getAddress } from "viem"
import { BTC, vBTC, sBTC } from "@/app/abi/addresses"
import Minter from "../Minter"
import BorrowButton from "../BorrowButton"

export function Dashboard() {
  const contractAddressBTC = getAddress(BTC);
  const contractAddressVBTC = getAddress(vBTC);
  const contractAddressSBTC = getAddress(sBTC);
    return (
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <div className="relative ml-auto flex-1 md:grow-0">
            <w3m-button></w3m-button>
            </div>
          </header>
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8">
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Lend your BTC Here!</CardDescription>
                  <CardTitle className="text-4xl">Deposit BTC</CardTitle>
                </CardHeader>
                <CardContent>
                <AddBTCForm/>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Borrow sBTC Here!</CardDescription>
                  <CardTitle className="text-4xl">Borrow sBTC</CardTitle>
                </CardHeader>
                <CardContent>
                  <BorrowButton/>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Pay sBTC to withdraw your BTC</CardDescription>
                  <CardTitle className="text-4xl">Pay Off sBTC</CardTitle>
                </CardHeader>
                <CardContent>
                <UnstakeButton/>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Mint your inital tokens here for TEST PURPOSES ONLY</CardDescription>
                  <CardTitle className="text-4xl">Test Mint Tokens</CardTitle>
                </CardHeader>
                <CardContent>
                  <br/>
                <Minter contractAddress={contractAddressBTC} buttonText="Mint BTC" />
                <br/>
        <Minter contractAddress={contractAddressVBTC} buttonText="Mint vBTC" />
        <br/>
        <Minter contractAddress={contractAddressSBTC} buttonText="Mint sBTC" />
      </CardContent>
              </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

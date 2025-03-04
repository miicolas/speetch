import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarMenuSubItem,
    SidebarMenuSub,
  } from "@/components/ui/sidebar"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
  } from "@/components/ui/dropdown-menu"
  import { Badge } from "@/components/ui/badge"
  import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";

import { 
  User2, 
  ChevronUp, 
  LayoutDashboard, 
  User, 
  Settings, 
  BarChart3, 
  FileText, 
  HelpCircle, 
  CreditCard,
  Bell,
  File,
  Banknote
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Session } from "@/lib/types/auth-type";
import SignOut from "./sign-out";


export function AppSidebar({ session }: { session: Session }) {
    return (
        <Sidebar className="border-r border-border bg-background/80 backdrop-blur-sm">
            <SidebarHeader className="p-4 flex items-center gap-2 border-b border-border flex-row">
                <Link href="/" className="flex items-center gap-2">
                    <Image src="/static/speetly-logo.png" alt="Speetly" width={32} height={32} />
                    <span className="font-semibold text-xl">Speetly</span>
                </Link>
            </SidebarHeader>
            <SidebarContent className="p-2">
                <div className="mb-4 px-3 py-2">
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                        Principal
                    </div>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <Link href="/dashboard" className="w-full">
                                <SidebarMenuButton>
                                    <LayoutDashboard className="h-4 w-4 mr-2" />
                                    Dashboard
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                        <Collapsible defaultOpen className="group/collapsible">
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton>
                                        <User className="h-4 w-4 mr-2" />
                                        Clients
                                        <ChevronUp className="ml-auto h-4 w-4 group-hover/collapsible:text-foreground transition-transform group-hover/collapsible:rotate-180" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        <SidebarMenuSubItem> 
                                            <Link href="/profile/info" className="w-full flex items-center">
                                                Information
                                            </Link>
                                        </SidebarMenuSubItem>
                                        <SidebarMenuSubItem>
                                            <Link href="/profile/security" className="w-full flex items-center">
                                                Security
                                            </Link>
                                        </SidebarMenuSubItem>
                                        <SidebarMenuSubItem>
                                            <Link href="/profile/preferences" className="w-full flex items-center">
                                                Preferences
                                            </Link>
                                        </SidebarMenuSubItem>
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                       
                        <SidebarMenuItem>
                            <Link href="/dashboard/projects" className="w-full">
                                <SidebarMenuButton>
                                    <File className="h-4 w-4 mr-2" />
                                    Projects
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <Link href="/dashboard" className="w-full">
                                <SidebarMenuButton>
                                    <Banknote className="h-4 w-4 mr-2" />
                                    Invoices
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <Link href="/dashboard/account-stripe" className="w-full">
                                <SidebarMenuButton>
                                    <Banknote className="h-4 w-4 mr-2" />
                                    Stripe
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </div>

                <div className="mb-4 px-3 py-2">
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                        Analytics
                    </div>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <FileText className="h-4 w-4 mr-2" />
                                Rapports
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <BarChart3 className="h-4 w-4 mr-2" />
                                Stats
                                <Badge variant="outline" className="ml-auto text-xs">Nouveau</Badge>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </div>

                <div className="px-3 py-2">
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                        Support
                    </div>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <HelpCircle className="h-4 w-4 mr-2" />
                                Help
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <Settings className="h-4 w-4 mr-2" />
                                Settings
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </div>
            </SidebarContent>
            <SidebarFooter className="border-t border-border p-2">
                <div className="bg-muted/40 rounded-lg p-2 mb-2">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Image src={session.user.image} alt={session.user.name} width={32} height={32} className="rounded-full" />
                        </div>
                        <div>
                            <div className="text-sm font-medium">{session.user.name}</div>
                            <div className="text-xs text-muted-foreground">{session.user.role}</div>
                        </div>
                        <div className="ml-auto">
                            <Bell className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-pointer" />
                        </div>
                    </div>
                </div>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton className="text-sm">
                                    <User2 className="h-4 w-4 mr-2" /> 
                                    Options
                                    <ChevronUp className="ml-auto h-4 w-4" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="top"
                                className="w-[--radix-popper-anchor-width]"
                            >
                                <DropdownMenuItem>
                                    <User className="h-4 w-4 mr-2" />
                                    <span>Profil</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <CreditCard className="h-4 w-4 mr-2" />
                                    <span>Subscription</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                   <SignOut />
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
  
import type { IApiKeyModuleService } from '@medusajs/framework/types'
import type { IAuthModuleService } from '@medusajs/framework/types'
import type { ICartModuleService } from '@medusajs/framework/types'
import type { ICurrencyModuleService } from '@medusajs/framework/types'
import type { ICustomerModuleService } from '@medusajs/framework/types'
import type { IFulfillmentModuleService } from '@medusajs/framework/types'
import type { IInventoryService } from '@medusajs/framework/types'
import type { IOrderModuleService } from '@medusajs/framework/types'
import type { IPaymentModuleService } from '@medusajs/framework/types'
import type { IPricingModuleService } from '@medusajs/framework/types'
import type { IProductModuleService } from '@medusajs/framework/types'
import type { IPromotionModuleService } from '@medusajs/framework/types'
import type { IRegionModuleService } from '@medusajs/framework/types'
import type { ISalesChannelModuleService } from '@medusajs/framework/types'
import type { IStockLocationService } from '@medusajs/framework/types'
import type { ITaxModuleService } from '@medusajs/framework/types'
import type { IUserModuleService } from '@medusajs/framework/types'
import type { IWorkflowEngineService } from '@medusajs/framework/types'
import type { IEventBusModuleService } from '@medusajs/framework/types'
import type { ICacheService } from '@medusajs/framework/types'

declare module '@medusajs/framework/types' {
  interface ModuleImplementations {
    'api_key': IApiKeyModuleService,
    'auth': IAuthModuleService,
    'cart': ICartModuleService,
    'currency': ICurrencyModuleService,
    'customer': ICustomerModuleService,
    'fulfillment': IFulfillmentModuleService,
    'inventory': IInventoryService,
    'order': IOrderModuleService,
    'payment': IPaymentModuleService,
    'pricing': IPricingModuleService,
    'product': IProductModuleService,
    'promotion': IPromotionModuleService,
    'region': IRegionModuleService,
    'sales_channel': ISalesChannelModuleService,
    'stock_location': IStockLocationService,
    'tax': ITaxModuleService,
    'user': IUserModuleService,
    'workflows': IWorkflowEngineService,
    'event_bus': IEventBusModuleService,
    'cache': ICacheService
  }
}
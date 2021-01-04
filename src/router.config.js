import Login from './components/Login.vue'
import Bank from './components/Bank.vue'
import Home from './components/Home.vue'

import Buss from './components/Buss.vue'
import RealTrans from './components/RealTrans.vue'
import Trans from './components/Trans.vue'
import VerifyRecord from './components/VerifyRecord.vue'
import PolicyOfService from './components/PolicyOfService.vue'
import ProductCodeMapping from './components/ProductCodeMapping.vue'


export default {
    routes: [
        { path: '/login', name: 'login', component: Login },
        {
            path: '/', name: 'bank', component: Bank,
            children: [
                {
                    path: '/',
                    component: Home
                },
                {
                    path: 'buss',
                    component: Buss
                },
                {
                    path: 'trans',
                    component: Trans
                },
                {
                    path: 'code',
                    component: ProductCodeMapping
                },
                {
                    path: 'realTrans',
                    component: RealTrans
                },
                {
                    path: 'verifyRecord',
                    component: VerifyRecord
                },
                {
                    path: 'policyOfService',
                    component: PolicyOfService
                }
            ]
        }
    ]
}

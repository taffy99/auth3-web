export const users = [
    {
        name: 'visitor',
        password: 'visitor'
    },
    {
        name: 'master',
        password: 'master'
    },
    {
        name: 'admin',
        password: 'admin'
    },

]

export const menuTreeData = [
    {
        name: 'App',
        path: '/app',
        icon: 'menu',
        children: [
            {
                name:'AppUser',
                path: '/app/user',
                icon: 'user'
            },
            {
                name:'AppDept',
                path: '/app/dept',
                icon: 'office-building'
            },
            {
                name:'AppRole',
                path: '/app/role',
                icon: 'avatar'
            },
            {
                name:'AppResource',
                path: '/app/resource',
                icon: 'management'
            }
        ],
        
    },
    {
        name: 'Sys',
        path: '/sys',
        icon: 'setting',
        children: [
            {
                name: 'SysUser',
                path: '/sys/user',
                icon: 'user-filled'
            },
            {
                name: 'SysNotice',
                path: '/sys/notice',
                icon: 'chat-dot-round'
            }
        ]
    },
    {
        name: 'Logs',
        path: '/logs',
        icon: 'document',
        children: [
            {
                name: 'LogsVisit',
                path: '/logs/visit',
                icon: 'tickets'
            },
            {
                name: 'LogsOperation',
                path: '/logs/operation',
                icon: 'operation'
            }
        ]
    }
]
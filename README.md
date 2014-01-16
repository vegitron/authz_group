authz-group
===========

An interface and implementation of groups.  Can be used for authenticating django applications.

To use:

    from authz_group import Group 
    
    g = Group()
    if g.is_member_of_group(username, group_name):
      # do something useful
      pass
    

The default implementation will always return True in the above code.  To change the group implementation, add a line like this to your Django settings.py file:

    AUTHZ_GROUP_BACKEND = 'authz_group.authz_implementation.settings.Settings'

    AUTHZ_GROUP_MEMBERS = {                                                         
                        "group_name": ["user1", "user2"],                       
                        "another_group": ["usera", "userb"],                    
                      }   

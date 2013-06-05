# This class handles a local group storage.  It is designed to be forwards and
# backwards compatible with groups created using the Solstice perl framework.

import authz_group.models

class SolsticeCrowdImplementation():
    @staticmethod
    def get_groups_for_user(login_name):
        sol_crowds = authz_group.models.SolsticeCrowd.objects.filter(solsticecrowdowner__person__login_name = login_name)

        return sol_crowds



